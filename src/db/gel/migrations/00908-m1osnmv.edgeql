CREATE MIGRATION m1osnmv5obdd54ifizwzf4xjxrppx3icilqthz5uepiloqpsg4ndha
    ONTO m1qntdtoo2r7zsdlrn44psqpidit4qkrdfprfiaxtfrwpyakehzhoq
{
  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY toggleValidRequiresTrue {
          RENAME TO toggleContinueRequiresTrue;
      };
  };
};
