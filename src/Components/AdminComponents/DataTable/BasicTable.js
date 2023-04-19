import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { Box, Tooltip } from '@mui/material';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import './BasicTable.css';

function BasicTable(props) {
  const axios = useAxiosPrivate();
  const [detail, setDetail] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get('admin/all-files');
      console.log(response.data);
      let result = response.data;
      setDetail(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownload = async (rowData) => {
    // console.log(rowData);
    const data = rowData[0].original;
    console.log(data);
    try {
      const response = await axios.post('/admin/download', data);
      // prettier-ignore
      const contentType = response.headers['content-type']
      console.log(contentType);
      let fileName = '';
      if (contentType.startsWith('text/csv')) {
        fileName = `${data.username}_${data.date}_${data.time}_${data.file_type}.csv`;
      } else if (contentType.startsWith('video/mp4')) {
        fileName = `${data.username}_${data.date}_${data.time}_${data.file_type}.mp4`;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.log(e);
    }
  };

  const downloadAllFiles = async (rowData) => {
    let requestData = [];
    rowData.map((item) => {
      console.log(item.original.file_type);
      // file_types.push(item.original.file_type);
      requestData.push(item.original);
    });
    console.log(requestData);

    try {
      const response = await axios.post('/admin/download-all', requestData, {
        responseType: 'blob',
        headers: {
          Accept: 'application/zip',
        },
      });
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${new Date().getTime()}.zip`);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.log(e);
    }
  };

  const handleVisualization = async (rowData) => {
    console.log(rowData);
    navigate('/visualize-recorded', { state: rowData });
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: 'username', //access nested data with dot notation
        header: 'USERNAME',
        enableClickToCopy: true,
        enableRowSelection: true,
      },
      {
        accessorKey: 'date',
        header: 'DATE',
        enableClickToCopy: true,
        enableRowSelection: true,
      },
      {
        accessorKey: 'time', //normal accessorKey
        header: 'TIME',
        enableClickToCopy: true,
        enableRowSelection: true,
      },
      {
        accessorKey: 'file_type',
        header: 'FILE TYPE',
        enableClickToCopy: true,
        enableRowSelection: true,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={detail}
      enableRowSelection
      enableEditing
      initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
      muiTablePaginationProps={{
        rowsPerPageOptions: [4, 5],
        showFirstButton: false,
        showLastButton: false,
      }}
      muiTableHeadCellProps={{
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          background: '#643CA4',
          color: 'white',
        },
      }}
      muiBottomToolbarProps={{
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          background: '#EDEAF7',
        },
      }}
      muiTableBodyRowProps={{
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          background: '#CABDE3',
        },
      }}
      muiTopToolbarProps={{
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          background: '#EDEAF7',
        },
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <button
          style={{
            border: '0px solid',
            borderRadius: '10px',
            padding: '5px',
            width: '100px',
            color: 'white',
            background: '#643CA4',
            cursor: 'pointer',
          }}
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => downloadAllFiles(table.getSelectedRowModel().rows)}
        >
          Download
        </button>
      )}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Visualize Data on Graph">
            <button
              className="material-table-action-button"
              onClick={() => handleVisualization(row.original)}
            >
              View
            </button>
          </Tooltip>
        </Box>
      )}
    />
  );
}

export default BasicTable;
