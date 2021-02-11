import React from "react";

import { Popover, Tag } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import popover from "./popover";

const columns = [
  {
    title: "Evento",
    dataIndex: "summary",
    key: "name",
  },
  {
    title: "Início",
    dataIndex: ["start", "dateTime"],
    key: "start",
    render: value => value ? new Date(value).toTimeString().slice(0, 5) : "-"
  },
  {
    title: "Fim",
    dataIndex: ["end", "dateTime"],
    key: "end",
    render: value => value ? new Date(value).toTimeString().slice(0, 5) : "-"
  },
  {
    title: <div>
      <span style={{ marginRight: `15px` }}>Status</span>
      <Popover placement="top" content={popover}>
        <QuestionCircleOutlined />
      </Popover>
    </div>,
    dataIndex: "processStatus",
    key: "status",
    render: value => <Tag color={value.color}>{value.status}</Tag>
  },
  {
    title: "Meet",
    dataIndex: "hangoutLink",
    key: "hangoutLink",
    render: value => value ? <a href={value} target="_blank">Link</a> : "-"
  },
];

export default columns;