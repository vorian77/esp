CREATE MIGRATION m1fugfro65ynflom2ysa3jipnfhcyw6rtjen53elcx4pfuln66fioq
    ONTO m1qbt4wjnzp5ygxlag6g3utityoeqgm46ywqnv4mubiadlk4mf2kha
{
      ALTER TYPE sys_rep::SysRepParm {
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
