using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {

                nomeContainer = "blobvitalhubg10container";
                stringConexao = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubg10;AccountKey=/yCgfJFjgaTH6Js/nLV4g46ceHH649S2wyAdJcn/gNozhysQ8X9MxwezhcOuNuowVA7vP6mw5cbN+AStzrarbQ==;EndpointSuffix=core.windows.net";
                //verifica se existe o arquivo
                if (arquivo != null)
                {
                    //gerar um nome unico para a imagem
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

                    var blobServiceClient = new BlobServiceClient(stringConexao);

                    var blobContainerCliente = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    var blobClient = blobContainerCliente.GetBlobClient(blobName);

                    using (var stream = arquivo.OpenReadStream())
                    {
                        await blobClient.UploadAsync(stream, true);
                    }

                    //retorna a uri com a imagem salva
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //retorna a imagem padrão
                    return "https://blobvitalhubg10.blob.core.windows.net/blobvitalhubg10container/defaultImage.webp";
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
