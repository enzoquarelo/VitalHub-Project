namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //método assincrono para envio de email que recebe o request
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
