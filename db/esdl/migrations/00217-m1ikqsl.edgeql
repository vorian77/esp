CREATE MIGRATION m1ikqslzntgybebfkplum6u2vpwqum6jzr5tvb4whya62rjny62qbq
    ONTO m1f5b4ryjc66obbmqo4uv5vkfc2ah7oa4kghczldfhfnif6g3zptka
{
                  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK actionsFieldGroup {
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK linkColumnsDisplay {
          RENAME TO linkColumns;
      };
  };
};
