CREATE MIGRATION m1vb6sr4pyiijcses3sv6nmqdx45suybtcp35hq7yvmu3qbwpis4ya
    ONTO m1tg7zg7ghury77jdmwlmsfy5nqga5ehppaz7qdqmfhh2wbgpcfeda
{
  ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY contactNameLast: std::str;
  };
};
