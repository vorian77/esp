CREATE MIGRATION m1mrj5jwnloruxdljp5tupbdkmpjhsjlzqwndwbpbm55p7wqa5nkiq
    ONTO m1tneliwx7lpw3yd7uvxpx2vl3gie56rva64s4eqhopel26tcxoioa
{
  ALTER TYPE sys_core::SysSystem {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
