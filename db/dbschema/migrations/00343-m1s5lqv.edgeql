CREATE MIGRATION m1s5lqvq25xfr36zpxbpp5hakuepv2gnsao5yibjk4uecikerjbpla
    ONTO m1avloblywj2ceftznqpcxo6snc3v4tgn6okoxgznkvra4xggctrsq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK column {
          RESET OPTIONALITY;
      };
  };
};
