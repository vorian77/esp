CREATE MIGRATION m1xxkj7nzq6kmyqsmoywciw7dbkrikonirhw7yaaxdihz67htym3ea
    ONTO m1iruhkudfpbsxhsdjfegog46q243qyxzsn52t63cvnalih6q7pqia
{
                  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      ALTER LINK dataObjDisplay {
          RENAME TO dataObjList;
      };
  };
};
