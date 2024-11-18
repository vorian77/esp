CREATE MIGRATION m1germh42dnhzejk4py3nkyfets7s4pph4ynx3wbicfq5l4gjvce7a
    ONTO m1ohxe2wwjf5ohahxs4uqqdhf3itnfxoz7jn64ngcki2pneegyb5tq
{
          CREATE TYPE sys_user::SysUserTypeTag EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK codeUserTypeTag: sys_core::SysCodeType;
      CREATE CONSTRAINT std::exclusive ON ((.codeUserTypeTag, .name));
  };
};
