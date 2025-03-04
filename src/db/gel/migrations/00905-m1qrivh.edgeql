CREATE MIGRATION m1qrivhuqcl5cu4hu4vjsdpkevv2grzsqvgpuzzpkvyb2rujxqrciq
    ONTO m1tps75oes2yf6rrf62cybj3npggx6e4wdkig4kb6vb4vzqegjnhga
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY linkExprPreset;
      DROP PROPERTY linkExprSave;
      DROP PROPERTY linkExprSelect;
  };
};
