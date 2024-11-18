CREATE MIGRATION m1sjj4no5pggwqkb54vdxucy2duxfdoxjempgll6vec5uigwa3xtvq
    ONTO m12ghovhjpoteqvthn4k4ofrhykkthgkqws3iacx7c46744lhvzgta
{
  ALTER TYPE sys_core::SysObj {
      ALTER LINK newOwner {
          RENAME TO owner;
      };
  };
  ALTER TYPE sys_core::SysObj {
      DROP LINK ownerOld;
  };
};
