from Data.collection_manager import CollectionManager


class AddressManager(CollectionManager):

    def __init__(self, db):
        super().__init__(db, 'addresses')
