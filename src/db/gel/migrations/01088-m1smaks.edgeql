CREATE MIGRATION m1smakscbcoczoeizdup43tsn7qrpc6mkf7sdw7tmnukkf6pjehsmq
    ONTO m1nrxxibywgaw3rnpboujwxvb4eeiwg3apcsyxv52yxarpmxhyvm3q
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attrs {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
