namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //m[etodo asincrono para envio de email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
