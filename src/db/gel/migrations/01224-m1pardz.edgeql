CREATE MIGRATION m1pardzpbi35wxrk3m5pkhbrdm4uwez53ql5jxvs7qondsrynilcya
    ONTO m16xiomjjkiakt7uctljtvkqez45e4fn5ipnuit2hqtgp6qtu55hfq
{
  ALTER FUNCTION sys_core::getDataObjColumn(dataObjName: std::str, columnName: std::str) USING (SELECT
      std::assert_single((SELECT
          sys_core::SysDataObjColumn
      FILTER
          ((.id IN ((SELECT
              sys_core::SysDataObj
          FILTER
              (.name = dataObjName)
          )).columns.id) AND std::any(((.column.name = columnName) UNION (.nameCustom = columnName))))
      ))
  );
};
