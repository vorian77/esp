CREATE MIGRATION m17bnoxp3urwxrbgcapt3ndjz4lz6p2x7royw6ugehd44q2bthu5lq
    ONTO m1redf3jmhjulfpeiixt3x43s3wdvj6ldqeg26mhufcoet5svr7vxa
{
  CREATE FUNCTION sys_core::getDataObjColumn(dataObjName: std::str, columnName: std::str) -> OPTIONAL sys_core::SysDataObjColumn USING (SELECT
      std::assert_single((SELECT
          sys_core::SysDataObjColumn
      FILTER
          ((.id IN ((SELECT
              sys_core::SysDataObj
          FILTER
              (.name = dataObjName)
          )).columns.id) AND (.column.name = columnName))
      ))
  );
};
