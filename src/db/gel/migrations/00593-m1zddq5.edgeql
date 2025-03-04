CREATE MIGRATION m1zddq5jp67rbf2ja3ehghjfzbux6qdqdq5wl3mg5zkb2zoikanfoq
    ONTO m1qu4bfrgxo4p3lalvxzcpj7e3mxjirqpq7wlakkgzj4ltj77sxb6q
{
              ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          RESET readonly;
      };
  };
};
