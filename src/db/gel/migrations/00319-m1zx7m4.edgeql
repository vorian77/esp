CREATE MIGRATION m1zx7m4otl5wqwqhpl3wa6e53c6zc3jeinnywnshjmtenm2b3joyza
    ONTO m17iclwnaqfm2myt6bvrfjxcpm3qexcsepnbdl6yr4cmwmhcspj4za
{
                  CREATE TYPE sys_core::SysDataObjColumnLink EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK linkColumns {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
          SET TYPE sys_core::SysDataObjColumnLink USING (.linkColumns[IS sys_core::SysDataObjColumnLink]);
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY order {
          SET TYPE default::nonNegative;
      };
  };
  ALTER TYPE sys_rep::SysRepUser {
      CREATE REQUIRED PROPERTY order: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
