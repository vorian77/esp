CREATE MIGRATION m1b66cvtnirry42vhjwqe76mjr53nrexkyf7ndj4rqoaqbjzerynaa
    ONTO m1lm7cjrmqsmtokp7kaaxs7aiq237epojo6uq7g3tovs742q673jaa
{
  ALTER TYPE sys_user::SysTask {
      DROP LINK pageDataObj;
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK targetNodeObj {
          RENAME TO nodeObj;
      };
  };
};
