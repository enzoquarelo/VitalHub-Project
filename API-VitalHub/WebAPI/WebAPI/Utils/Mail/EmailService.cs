
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService

    {
        //variável privada com as configs do email
        private readonly EmailSettings emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            //obtem as configs do email e armazena na variável privada
            emailSettings = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                var email = new MimeMessage();

                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatário do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define o assunto do email
                email.Subject = mailRequest.Subject;

                //cria o corpo do email
                var builder = new BodyBuilder();

                //define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no obj MimeMessage
                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient())
                {
                    //conecta-se ao servidor SMTP usando os dados do emailSettings 
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    //autentica-se ao servidor smtp usando os dados do emailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //envia o email assincrono
                    await smtp.SendAsync(email);
                }

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

