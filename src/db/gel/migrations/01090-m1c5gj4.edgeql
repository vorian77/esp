CREATE MIGRATION m1c5gj4mdc5waspliylhuztpgigfgxxynkg6e6oietay3z2iydk22q
    ONTO m17fehpe7cz6v3akhk53qhw4jlhng4dggwq7gvh7fkhlp2qtuwtaba
{
  ALTER TYPE sys_core::SysAttr {
      CREATE CONSTRAINT std::exclusive ON ((.obj, .codeAttrType));
  };
};
