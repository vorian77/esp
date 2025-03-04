CREATE MIGRATION m1nkijore76ucpr2agzvxttqnq4fjpgx2eqtljoumyybvc3kik3piq
    ONTO m1ld4xuedyu7gustysrtfnlikivippuxup45eunluv5ce7zvexo4va
{
                  ALTER TYPE sys_migr::SysMigrSourceColumn {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_migr::SysMigrSourceColumn {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_migr::SysMigrSourceTable {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_migr::SysMigrSourceTable {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_migr::SysMigrTargetColumn {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_migr::SysMigrTargetColumn {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_migr::SysMigrTargetTable {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_migr::SysMigrTargetTable {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
