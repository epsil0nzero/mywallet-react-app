import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBalances } from '../../redux/actions/walletActions';

import { CssBaseline, Container } from '@material-ui/core';
import { DataGrid, ColDef } from '@material-ui/data-grid';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'symbol', headerName: 'Symbol', width: 200 },
  { field: 'icon', headerName: 'Icon', width: 200 },
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
