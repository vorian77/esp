CREATE MIGRATION m16nq2ddb6bagzpep7qsn3k2r4moe2g5r3zdgwoibnupcxn6mjsuka
    ONTO m1a333gc2ompsqsvqshjufvqkt7t2pxpamrnfbbonagsle2nsqa6sq
{
              DROP FUNCTION sys_core::getRootObj();
  DROP TYPE sys_user::UserRoot;
};
