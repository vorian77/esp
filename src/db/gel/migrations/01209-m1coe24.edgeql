CREATE MIGRATION m1coe242qsq5pkxci4rzscyezgjbi5n2lmy2qsb5u4aivihuut3voq
    ONTO m1jko2auklv6ovdcyqjxvdrvquo3xfykde5pog6azn7l5u3vblnl6a
{
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE PROPERTY headerAlt: std::str;
  };
};
