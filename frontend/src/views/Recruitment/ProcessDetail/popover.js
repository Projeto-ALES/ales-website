import React from "react";

import { Tag } from "antd";

const style = {
  margin: `10px 0`,
}

const popover = (
  <div style={{ maxWidth: `280px` }}>
    <div style={style}>
      <Tag color="orange">Vago</Tag>
      Significa que ninguém ainda está alocado para o evento
    </div>
    <div style={style}>
      <Tag color="blue">Pendente</Tag>
      Significa que um candidato escolheu este horário mas não confirmou presença no evento ainda
    </div>
    <div style={style}>
      <Tag color="green">Confirmado</Tag>
      Significa que o candidato já confirmou a presença no evento!
    </div>
  </div>
);

export default popover;