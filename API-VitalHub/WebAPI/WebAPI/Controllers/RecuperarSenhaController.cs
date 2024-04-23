using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _context;

        private readonly EmailSendingSevice _emailSendingService;

        public RecuperarSenhaController(VitalContext context, EmailSendingSevice emailSendingSevice)
        {
            _context = context;
            _emailSendingService = emailSendingSevice;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                //busca o usuario pelo email
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null)
                {
                    return NotFound("Usuario nao encontrado");

                }

                //gera um codigo com 4 algarismos
                Random random = new Random();
                int codigoRecuperacao = random.Next(1000, 9999);
                user.CodRecupSenha = codigoRecuperacao;

                await _context.SaveChangesAsync();

                //envia o codigo de confirmacao para o email
                await _emailSendingService.SendRecoveryPassword(user.Email!, codigoRecuperacao);

                return Ok("codigo de confirmacao enviado com sucesso");


            }

            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("ValidarCodigoRecupSenha")]

        public async Task<IActionResult> validatePasswordRecoveryCod(string email, int codigo)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("Usuario nao encontrado");
                }

                if (user.CodRecupSenha != codigo)
                {
                    return BadRequest("Codigo de recuperacao invalido");

                }

                user.CodRecupSenha = null;
                await _context.SaveChangesAsync();
                return Ok("codigo de recuperacao esta correto");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
