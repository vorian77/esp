CREATE MIGRATION m1qfqb6sz76dikcinxqywee2wy5gfgzp4b4qxrboy554yhb25otrrq
    ONTO m1germh42dnhzejk4py3nkyfets7s4pph4ynx3wbicfq5l4gjvce7a
{
          ALTER TYPE sys_user::SysUserTypeTag {
      DROP CONSTRAINT std::exclusive ON ((.codeUserTypeTag, .name));
      CREATE REQUIRED PROPERTY isAccessible: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
