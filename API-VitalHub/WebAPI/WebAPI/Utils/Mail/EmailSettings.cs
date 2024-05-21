namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {

        //Email remetente
        public string? Email { get; set; }

        //Senha do Remetente
        public string? Password { get; set; }

        //Host do servidor SMTP
        public string? Host { get; set;}

        //Nome exibido do remetente
        public string? DisplayName { get; set;}

        //Porta do servidor SMTP
        public int Port { get; set;}
    }
}
