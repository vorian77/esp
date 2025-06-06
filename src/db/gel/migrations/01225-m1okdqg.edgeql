CREATE MIGRATION m1okdqgpazusymqez44usz5wpb2frnwmpvxvlljyi4b4gpvl32c3ua
    ONTO m1pardzpbi35wxrk3m5pkhbrdm4uwez53ql5jxvs7qondsrynilcya
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK responses {
          RENAME TO replies;
      };
  };
};
