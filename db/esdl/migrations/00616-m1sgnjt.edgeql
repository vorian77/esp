CREATE MIGRATION m1sgnjtisabjzczsdr5lqm4qfmqb5upvbjccmkkylxriipiin5buwq
    ONTO m16yf4kemllifxocior2yg3ofuu27u4m4xm5qjsr5qc7or5qu2tnhq
{
  ALTER TYPE sys_core::SysCode {
      ALTER LINK createdBy {
          RENAME TO createdByOld;
      };
  };
  ALTER TYPE sys_core::SysCode {
      ALTER LINK modifiedBy {
          RENAME TO modifiedByOld;
      };
  };
  ALTER TYPE sys_core::SysCode {
      ALTER PROPERTY createdAt {
          RENAME TO createdAtOld;
      };
  };
  ALTER TYPE sys_core::SysCode {
      ALTER PROPERTY modifiedAt {
          RENAME TO modifiedAtOld;
      };
  };
};
