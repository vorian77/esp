CREATE MIGRATION m1gcjw7ddg24lmitegiltlzwhycgpwa5dsbrtapespgxtsjq5yoy7q
    ONTO m1ir4rvcfllgragex575xw7fcvp4uce4hybvuyjidcnmnf5zk7p53a
{
              ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          RESET readonly;
      };
  };
};
