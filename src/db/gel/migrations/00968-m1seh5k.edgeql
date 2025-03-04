CREATE MIGRATION m1seh5kb67b4toqjqhjgl36s3rlz3y7jfl4n53fbobychsu35hkava
    ONTO m1g4itaehwkmzmss5qcww2az3rh5suicqfwqi42m5llbz4cxstrfpa
{
  ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          ON TARGET DELETE DELETE SOURCE;
      };
      ALTER LINK modifiedBy {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
