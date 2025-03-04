CREATE MIGRATION m1k3ch6nj2jfvsck73lls3xitvkzwxi4zwacpmjvd4bqu3vgmi65na
    ONTO m1zk2zpiaeh5mgwzh4hy6qujlf7fehapnrypvecfmgeg47rsyhsfva
{
                              ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE PROPERTY exprData: std::str;
  };
};
