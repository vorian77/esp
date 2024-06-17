CREATE MIGRATION m1ag23m6p256ckxvzcfn24j57ovbxavez2q2nx2cuztkfpcjhlwimq
    ONTO m1rsrowagrd4ggna65x2aadhf6acfah7g6xhxb6zztqrpwbhkz4a7q
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK processType: sys_core::SysCode;
      CREATE PROPERTY processExprId: std::str;
  };
};
