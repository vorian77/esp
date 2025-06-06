CREATE MIGRATION m1ztrajyf62j75rd6ampf4tmcfgaterdf37dip5n3ssqqnudmglrjq
    ONTO m1okdqgpazusymqez44usz5wpb2frnwmpvxvlljyi4b4gpvl32c3ua
{
  ALTER TYPE sys_core::SysGridStyle {
      DROP LINK styleTrigger;
  };
  ALTER TYPE sys_core::SysGridStyle {
      CREATE PROPERTY exprTrigger: std::str;
  };
  DROP TYPE sys_core::SysGridStyleTrigger;
};
