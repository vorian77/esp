CREATE MIGRATION m1jko2auklv6ovdcyqjxvdrvquo3xfykde5pog6azn7l5u3vblnl6a
    ONTO m1v4mkqyalguj5s6e3op7rywa4chriytmraypyg6ny2nmmbztn3uaq
{
  ALTER TYPE sys_user::SysTask {
      CREATE PROPERTY exprWith: std::str;
  };
};
