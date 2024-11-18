CREATE MIGRATION m1qfkcct62msghynpba3zkisjycbl5zff665htatxtcxij4tcme4ka
    ONTO m1gfwex2a2b5t2mqrwbkx6jrbpjwosrh2dlhwidhjeflvknwtwvwgq
{
  ALTER TYPE sys_user::SysStaff {
      ALTER LINK owner {
          RENAME TO ownerOld;
      };
  };
};
