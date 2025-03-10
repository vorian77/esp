CREATE MIGRATION m1k767kwcj4zk3aetf2m3zliuncwbvx2efq4wqm25ypiffoetd4fha
    ONTO m15fr7bhvvzpmn5ebnb5j6khiox5scbqtbtfmblh3zj6aqcnkzfdoa
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE LINK codeTreeLeafId: sys_core::SysCode;
  };
};
