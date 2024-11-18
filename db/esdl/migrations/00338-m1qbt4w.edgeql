CREATE MIGRATION m1qbt4wjnzp5ygxlag6g3utityoeqgm46ywqnv4mubiadlk4mf2kha
    ONTO m13a65dhchmrvk7dmcitoinlg72vlsa5irki2ugexwwodtfqdfx4rq
{
      CREATE FUNCTION sys_rep::getReport(name: std::str) -> OPTIONAL sys_rep::SysRep USING (SELECT
      sys_rep::SysRep
  FILTER
      (.name = name)
  );
};
