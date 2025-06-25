CREATE MIGRATION m1eokh3y5dayib76pekpu4y2fdarczggf77jwooazv3hxocwfbxlra
    ONTO m1udjckkanm673m65euaviojo4ri2dnklk5l7uywmtqx5wdknntqtq
{
  ALTER TYPE sys_core::SysNodeObj {
      DROP LINK codeNavType;
  };
};
