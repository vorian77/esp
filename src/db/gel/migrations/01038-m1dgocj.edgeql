CREATE MIGRATION m1dgocj3btutwfdkizfntgxsobsfcaey7omll2lvgpzpdk6p44vlgq
    ONTO m1do3kbi5pevy2eay5jcny7gqaevrhiymdkcmlu32i2hdw74nbtu5q
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeValueAction {
          RENAME TO codeItemChangeAction;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeValueType {
          RENAME TO codeItemChangeValueType;
      };
  };
};
