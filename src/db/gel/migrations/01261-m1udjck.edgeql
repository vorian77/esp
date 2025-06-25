CREATE MIGRATION m1udjckkanm673m65euaviojo4ri2dnklk5l7uywmtqx5wdknntqtq
    ONTO m14rwb442y42qvku4j3do55bznd46ydensa2j5c6rpfz4xwirodl7a
{
  ALTER TYPE sys_user::SysTask {
      DROP PROPERTY isPinToDash;
  };
};
