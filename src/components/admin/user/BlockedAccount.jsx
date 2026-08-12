import React from 'react'

function BlockedAccount() {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-red-500">
                        Account Blocked
                    </h1>

                    <p className="mt-2 text-gray-500">
                        You can't access this website because your account has been blocked.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlockedAccount