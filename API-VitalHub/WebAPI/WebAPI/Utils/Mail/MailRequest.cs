namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        //destinatário
        public string? ToEmail { get; set; }

        //assunto e mail

        public string? Subject { get; set; }

        //corpo email

        public string? Body { get; set; }

    }
}
