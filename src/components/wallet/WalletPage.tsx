import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBalances } from '../../redux/actions/walletActions';

import { CssBaseline, Container,  } from '@material-ui/core';
import { DataGrid, ColDef, ColTypeDef, ValueFormatterParams } from '@material-ui/data-grid';

const icon: ColTypeDef = {
  type: 'string',
  renderCell: (params: ValueFormatterParams) =>  {  
    return <img src={`/assets/icons/${params.value}.svg`} />;
  }
};

const columns: ColDef[] = [
  { field: 'icon', headerName: ' ', width: 50, ...icon, },
  { field: 'symbol', headerName: 'Name', width: 80 },  
  { field: 'balance', headerName: 'Balance', width: 200 },  
];

const WalletPage = ({
  getBalances,
  wallet
}: any) => {

  const rows = wallet.balances;

  useEffect(() => { getBalances(); }, [getBalances]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Container>
    </React.Fragment>    
  );
};

const mapStateToProps = (state: any) => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, { getBalances })(WalletPage);
