using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Exame
{
    public Guid Id { get; set; } = new Guid();

    public string? Descricao { get; set; }

    public Guid? ConsultaId { get; set; }

    public virtual Consulta? Consulta { get; set; }
}
