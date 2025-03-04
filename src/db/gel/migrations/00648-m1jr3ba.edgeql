CREATE MIGRATION m1jr3babvchxskl2yosxtr4t54f3llngs7uwuebb37b7yry3ot3aaq
    ONTO m1sjj4no5pggwqkb54vdxucy2duxfdoxjempgll6vec5uigwa3xtvq
{
              ALTER TYPE sys_core::SysObj {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
