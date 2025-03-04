CREATE MIGRATION m1ir4rvcfllgragex575xw7fcvp4uce4hybvuyjidcnmnf5zk7p53a
    ONTO m1zddq5jp67rbf2ja3ehghjfzbux6qdqdq5wl3mg5zkb2zoikanfoq
{
              ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          SET readonly := true;
      };
  };
};
