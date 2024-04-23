using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Utils.OCR;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OCRController : ControllerBase
    {
        private readonly OCRService _ocrService;
        public OCRController(OCRService ocrService)
        {
            _ocrService = ocrService;
        }

        [HttpPost]
        public async Task<IActionResult> RecognizeText([FromForm]FileUploadModel fileUploadModel)
        {
            try
            {   
                //erifica se a imagem foi recebida
                if (fileUploadModel == null || fileUploadModel.Image == null)
                {
                    return BadRequest("Nenhuma imagem foi fornecida");
                }

                //abre a conexão com o recurso
                using (var stream = fileUploadModel.Image.OpenReadStream())
                {
                    //chama o método para reconheer a imagem 
                    var result = await _ocrService.RecognizeTextAsync(stream);

                    //retorna resultado
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
