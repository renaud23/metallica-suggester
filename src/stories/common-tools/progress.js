import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

function Progress({ display, value = 0 }) {
	if (display) {
		return (
			<Box position="relative" display="inline-flex">
				<CircularProgress
					variant="determinate"
					value={value}
					color="secondary"
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography
						variant="caption"
						component="div"
						color="textSecondary"
					>{`${Math.round(value)}%`}</Typography>
				</Box>
			</Box>
		);
	}
	return null;
}

export default Progress;
