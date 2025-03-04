CREATE MIGRATION m1t2cfeezzy7z44yja77kn5644ne7gfgldkfhddt32hbdcyesk2pzq
    ONTO m1k3ch6nj2jfvsck73lls3xitvkzwxi4zwacpmjvd4bqu3vgmi65na
{
                              ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER PROPERTY exprData {
          RENAME TO exprDisplay;
      };
  };
};
